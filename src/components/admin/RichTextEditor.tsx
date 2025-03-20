import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useEffect, useRef } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
}

class UploadAdapter {
  private loader: any;
  private toast: any;

  constructor(loader: any, toast: any) {
    this.loader = loader;
    this.toast = toast;
  }

  async upload() {
    try {
      const file = await this.loader.file;
      
      if (!file.type.startsWith('image/')) {
        this.toast({
          variant: "destructive",
          title: "Invalid file type",
          description: "Please upload an image file",
        });
        throw new Error('Invalid file type');
      }

      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("blog-images")
        .upload(filePath, file);

      if (uploadError) {
        this.toast({
          variant: "destructive",
          title: "Upload failed",
          description: uploadError.message,
        });
        throw uploadError;
      }

      const { data: publicUrlData } = supabase.storage
        .from("blog-images")
        .getPublicUrl(filePath);

      this.toast({
        title: "Success",
        description: "Image uploaded successfully",
      });

      return {
        default: publicUrlData.publicUrl
      };
    } catch (error: any) {
      console.error('Upload failed:', error);
      throw error;
    }
  }

  abort() {
    console.log('Upload aborted');
  }
}

export function RichTextEditor({ content = '', onChange }: RichTextEditorProps) {
  const editorRef = useRef<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (editorRef.current && content !== editorRef.current.getData()) {
      try {
        const safeContent = typeof content === 'string' ? content : '';
        editorRef.current.setData(safeContent);
      } catch (error) {
        console.error('Error setting editor data:', error);
        editorRef.current?.setData('');
      }
    }
  }, [content]);

  const handleReady = (editor: any) => {
    editorRef.current = editor;
    editor.plugins.get('FileRepository').createUploadAdapter = (loader: any) => {
      return new UploadAdapter(loader, toast);
    };
    
    try {
      const safeContent = typeof content === 'string' ? content : '';
      editor.setData(safeContent);
    } catch (error) {
      console.error('Error in editor ready:', error);
      editor.setData('');
    }
  };

  const handleEditorChange = (_event: any, editor: any) => {
    if (!editor) {
      console.warn('Editor instance not available');
      return;
    }
    
    try {
      const data = editor.getData();
      onChange(data || '');
    } catch (error) {
      console.error('CKEditor error:', error);
      onChange('');
    }
  };

  return (
    <div className="border rounded-md min-h-[400px]">
      <CKEditor
        editor={ClassicEditor}
        data={typeof content === 'string' ? content : ''}
        onReady={handleReady}
        onChange={handleEditorChange}
        config={{
          toolbar: {
            items: [
              'heading',
              '|',
              'bold',
              'italic',
              'link',
              'bulletedList',
              'numberedList',
              '|',
              'outdent',
              'indent',
              '|',
              'imageUpload',
              'blockQuote',
              'insertTable',
              'mediaEmbed',
              'undo',
              'redo'
            ],
            shouldNotGroupWhenFull: true
          },
          mediaEmbed: {
            previewsInData: true,
            providers: [
              {
                name: 'youtube',
                url: [
                  /^(?:m\.)?youtube\.com\/watch\?v=([\w-]+)/,
                  /^(?:m\.)?youtube\.com\/v\/([\w-]+)/,
                  /^youtube\.com\/embed\/([\w-]+)/,
                  /^youtu\.be\/([\w-]+)/
                ],
                html: match => {
                  const id = match[1];
                  return (
                    '<div class="media-embed youtube-embed" style="position: relative; width: 100%; max-width: 640px; margin: 1em auto;">' +
                    '<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;">' +
                    '<iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" ' +
                    `src="https://www.youtube.com/embed/${id}" ` +
                    'frameborder="0" allowfullscreen></iframe>' +
                    '</div></div>'
                  );
                }
              },
              {
                name: 'vimeo',
                url: [
                  /^vimeo\.com\/(\d+)/,
                  /^vimeo\.com\/channels\/[\d\w]+\/(\d+)/,
                  /^vimeo\.com\/groups\/[\d\w]+\/videos\/(\d+)/,
                  /^vimeo\.com\/album\/[\d\w]+\/video\/(\d+)/,
                  /^vimeo\.com\/[\d\w]+\/[\d\w]+\/video\/(\d+)/
                ],
                html: match => {
                  const id = match[1];
                  return (
                    '<div class="media-embed vimeo-embed" style="position: relative; width: 100%; max-width: 640px; margin: 1em auto;">' +
                    '<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;">' +
                    '<iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" ' +
                    `src="https://player.vimeo.com/video/${id}" ` +
                    'frameborder="0" allowfullscreen></iframe>' +
                    '</div></div>'
                  );
                }
              },
              {
                name: 'twitter',
                url: /^twitter\.com/,
                html: url => {
                  return (
                    '<div class="media-embed twitter-embed" style="width: 100%; max-width: 550px; margin: 1em auto;">' +
                    `<blockquote class="twitter-tweet"><a href="${url}"></a></blockquote>` +
                    '<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>' +
                    '</div>'
                  );
                }
              },
              {
                name: 'instagram',
                url: /^instagram\.com/,
                html: url => {
                  return (
                    '<div class="media-embed instagram-embed" style="width: 100%; max-width: 550px; margin: 1em auto;">' +
                    `<blockquote class="instagram-media" data-instgrm-permalink="${url}"></blockquote>` +
                    '<script async src="//www.instagram.com/embed.js"></script>' +
                    '</div>'
                  );
                }
              },
              {
                name: 'spotify',
                url: [
                  /^open\.spotify\.com\/(track|album|playlist|artist)\/([\w-]+)/
                ],
                html: match => {
                  const type = match[1];
                  const id = match[2];
                  return (
                    '<div class="media-embed spotify-embed" style="width: 100%; max-width: 640px; margin: 1em auto;">' +
                    '<iframe ' +
                    `src="https://open.spotify.com/embed/${type}/${id}" ` +
                    'style="width: 100%; max-height: 380px;" ' +
                    'frameborder="0" allowtransparency="true" ' +
                    'allow="encrypted-media"></iframe>' +
                    '</div>'
                  );
                }
              }
            ]
          },
          image: {
            toolbar: ['imageTextAlternative', 'imageStyle:full', 'imageStyle:side'],
            styles: {
              options: [
                { name: 'full', className: 'image-style-full-width' },
                { name: 'side', className: 'image-style-side' }
              ]
            },
            resizeOptions: [
              {
                name: 'imageResize:original',
                value: null,
                label: 'Original'
              },
              {
                name: 'imageResize:50',
                value: '50',
                label: '50%'
              },
              {
                name: 'imageResize:75',
                value: '75',
                label: '75%'
              }
            ]
          }
        }}
      />
    </div>
  );
}