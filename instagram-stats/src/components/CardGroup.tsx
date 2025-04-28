import { MiniUserCards } from "./MiniUserCards";

interface CardGroupProps {
  children: { value: string; timestamp: number; href: string }[];
}

export const CardGroup: React.FC<CardGroupProps> = ({ children }) => {
  return (
    <div>
      <div className="flex flex-wrap gap-1">
        {(children ?? [])
          .reduce<{ value: string; timestamp: number; href: string }[][]>(
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
                  description={`${new Date(
                    req.timestamp * 1000
                  ).toLocaleString()}`}
                  link={req.href}
                />
              ))}
            </div>
          ))}
      </div>
    </div>
  );
};
