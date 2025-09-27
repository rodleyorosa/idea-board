import { MainContentWrapper } from "../MainContentWrapper";
import { NewNote } from "../NewNote";

export const StickyWall = () => {
  const stickWalls = [
    {
      id: 1,
      title: "Social Media",
      content:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec qu",
    },
    {
      id: 2,
      title: "Social Media",
      content:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec qu",
    },
    {
      id: 3,
      title: "Social Media",
      content:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec qu",
    },
    {
      id: 4,
      title: "Social Media",
      content:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec qu",
    },
    {
      id: 5,
      title: "Social Media",
      content:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec qu",
    },
    {
      id: 6,
      title: "Social Media",
      content:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec qu",
    },
    {
      id: 7,
      title: "Social Media",
      content:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec qu",
    },
  ];

  return (
    <MainContentWrapper title="Sticky Wall">
      <div className="flex">
        <main className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            <NewNote />
            {stickWalls.map((item, key) => {
              return (
                <div
                  key={key}
                  className="bg-pink-100 p-4 rounded-md shadow-md sm:aspect-square"
                >
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <div>{item.content}</div>
                </div>
              );
            })}
          </div>
        </main>
      </div>
    </MainContentWrapper>
  );
};
