interface CustomCardProps {
  title?: string;
  description?: string;
  content: React.ReactNode;
}

export const CustomCard: React.FC<CustomCardProps> = ({
  title,
  description,
  content
}) => {
  return (
    // <div className="border border-gray-300 rounded-md h-full px-2 py-3">
    <div className="">
      <div className="pb-2">
        {title && <h4 className="font-bold text-md">{title}</h4>}
        {description && <p className="text-gray-500 text-sm">{description}</p>}
      </div>
      {content}
    </div>
  );
};
