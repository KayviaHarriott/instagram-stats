interface MiniCardProps {
  title: string;
  description: string;
  checkboxArea: React.ReactNode;
}

export const MiniCardProps: React.FC<MiniCardProps> = ({
  title,
  description,
  checkboxArea,
}) => {
  return (
    <div className="border border-gray-300 rounded-md h-full px-1 py-3">
        <div className="flex">
           <div> {checkboxArea}</div>
           <div>
            <h4 className="font-bold text-md">{title}</h4>
            <p className="text-gray-500 text-sm">{description}</p>
           </div>
        </div>
    </div>
  );
};
