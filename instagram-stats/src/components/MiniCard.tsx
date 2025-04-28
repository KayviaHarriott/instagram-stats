interface MiniCardProps {
  title: string;
  description: string;
  url: string;
}

export const MiniCardProps: React.FC<MiniCardProps> = ({
  title,
  description,
  url,
}) => {
  return (
    <div className="border border-gray-300 rounded-md h-full px-1 py-3">
        <div className="flex">
           <div>
            <h4 className="font-bold text-md">{title}</h4>
            <p className="text-gray-500 text-sm">{description}</p>
            <p>{url}</p>
           </div>
        </div>
    </div>
  );
};
