


interface DropZoneProps {
  label?: string;
}

export const CustomDropzone: React.FC<DropZoneProps> = ({  label}) => {


  return (
    <div>
      {label ? label : null}
    </div>
  );
};
