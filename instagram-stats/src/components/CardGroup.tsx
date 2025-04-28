import { MiniUserCards } from "./MiniUserCards";

interface CardGroupProps {
  children: { value: string; timestamp?: number; href: string }[];
  dateDescription?: string;
}

export const CardGroup: React.FC<CardGroupProps> = ({ children, dateDescription }) => {
  return (
    <div>
      <div className="flex flex-wrap gap-1">
        {(children ?? [])
          .reduce<{ value: string; timestamp?: number; href: string }[][]>(
            (chunks, req, index) => {
              const chunkIndex = Math.floor(index / 3);
              if (!chunks[chunkIndex]) {
                chunks[chunkIndex] = [];
              }
              chunks[chunkIndex].push(req);
              return chunks;
            },
            []
          )
          .map((chunk, chunkIndex) => (
            <div className="flex gap-2 w-full" key={chunkIndex}>
              {chunk.map((req, index) => (
                <MiniUserCards
                  key={index}
                  username={`${req.value}`}
                  dateDescription={dateDescription ? dateDescription : null}
                  date={req.timestamp ? `${new Date(
                    req.timestamp * 1000
                  ).toLocaleString()}` : null}
                  link={req.href}
                />
              ))}
            </div>
          ))}
      </div>
    </div>
  );
};
