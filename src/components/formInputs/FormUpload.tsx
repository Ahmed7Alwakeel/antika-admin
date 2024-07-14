
import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { IFormUpload } from '../../types/Interfaces';

const FormUpload = ({ setShownImage, shownImage, errors, formik, name, touched }: IFormUpload) => {
    const [error, setError] = useState<string>()
    const filesFormat = ["image/jpeg", "image/png", "image/jpg"];
    const convertFilesToBase64 = (files: FileList) => {
        return new Promise((resolve, reject) => {
            const filePromises = Array.from(files).map((file) => {
                return new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onload = () => resolve(reader.result);
                    reader.onerror = (error) => reject(error);
                    reader.readAsDataURL(file as Blob);
                });
            });

            Promise.all(filePromises)
                .then((base64Array) => resolve(base64Array))
                .catch((error) => reject(error));
        });
    };

    const onDrop = useCallback(async (acceptedFiles: any) => {
        if (!filesFormat.includes(acceptedFiles[0].type)) {
            setError('File type mismatch')
        } else if (acceptedFiles[0].size > 500 * 1024) {
            setError('Image size must be less that or equal 500KB')
        } else {
            const acceptedTypes = acceptedFiles.filter((file: any) => filesFormat.includes(file.type))
            let files = await convertFilesToBase64(acceptedTypes);
            setShownImage((files as [{}])[0])
            setError('')
            formik.setFieldValue(`${name}`, acceptedTypes[0])
        }
    }, [])

    const { getRootProps, getInputProps

    } = useDropzone({
        onDrop
    })

    return (
        <>
            <div className={`drag-image-container ${shownImage && 'images-added build-form'}  ${errors && touched && 'drag-error-container'}`}>
                {shownImage &&
                    <>
                        <div className='images-wrapper'>
                            <div className='img-container '>
                                <img
                                    alt={'img'}
                                    src={shownImage}

                                />
                            </div>
                        </div>
                        <div className='edit-icon' {...getRootProps()}>
                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.5547 0.878906C11.2383 0.195312 12.3594 0.195312 13.043 0.878906L13.3711 1.20703C14.0547 1.89062 14.0547 3.01172 13.3711 3.69531L7.35547 9.71094C7.10938 9.95703 6.80859 10.0938 6.50781 10.1758L4.01953 10.75C3.88281 10.7773 3.71875 10.75 3.60938 10.6406C3.5 10.5312 3.47266 10.3672 3.5 10.2305L4.07422 7.74219C4.15625 7.44141 4.29297 7.14062 4.53906 6.89453L10.5547 0.878906ZM12.4141 1.50781C12.0859 1.15234 11.5117 1.15234 11.1836 1.50781L10.4453 2.21875L12.0312 3.80469L12.7422 3.06641C13.0977 2.73828 13.0977 2.16406 12.7422 1.83594L12.4141 1.50781ZM4.92188 7.93359L4.51172 9.73828L6.28906 9.32812C6.45312 9.30078 6.61719 9.21875 6.72656 9.08203L11.4023 4.40625L9.84375 2.84766L5.16797 7.52344C5.03125 7.63281 4.94922 7.79688 4.92188 7.93359ZM5.6875 2C5.90625 2 6.125 2.21875 6.125 2.4375C6.125 2.68359 5.90625 2.875 5.6875 2.875H2.1875C1.44922 2.875 0.875 3.47656 0.875 4.1875V12.0625C0.875 12.8008 1.44922 13.375 2.1875 13.375H10.0625C10.7734 13.375 11.375 12.8008 11.375 12.0625V8.5625C11.375 8.34375 11.5664 8.125 11.8125 8.125C12.0312 8.125 12.25 8.34375 12.25 8.5625V12.0625C12.25 13.293 11.2656 14.25 10.0625 14.25H2.1875C0.957031 14.25 0 13.293 0 12.0625V4.1875C0 2.98438 0.957031 2 2.1875 2H5.6875Z" fill="#211D33" />
                            </svg>

                        </div>
                    </>
                }
                {!shownImage &&
                    <div {...getRootProps()} className='drag-wrapper'>
                        <input {...getInputProps()} />
                        <p>Drag & Drop image here</p>
                        <p className='types'>JPG, PNG, JPEG</p>
                        <span className="types">Max size 500KB</span>
                    </div>
                }
            </div>
            <p className='drag-error builder'>{error}</p>
        </>
    )
}
export default FormUpload;