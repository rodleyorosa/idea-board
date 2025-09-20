const App = () => {
  return (
    <div className="flex p-6 gap-6">
      <div className="flex flex-col gap-4 bg-gray-100 p-2 w-1/2 hidden 2xl:block">
        <div className="flex items-center">
          <div className="text-xl font-semibold">Menu</div>
          <svg
            width="20px"
            height="20px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 18L20 18"
              stroke="#000000"
              stroke-width="2"
              stroke-linecap="round"
            />
            <path
              d="M4 12L20 12"
              stroke="#000000"
              stroke-width="2"
              stroke-linecap="round"
            />
            <path
              d="M4 6L20 6"
              stroke="#000000"
              stroke-width="2"
              stroke-linecap="round"
            />
          </svg>
        </div>
        <div>
          <p className="uppercase text-xs font-semibold">section</p>
          <div>
            <div className="flex gap-2 bg-gray-200 p-2 rounded-sm">
              <div>{">"}</div>
              <p>Sticky Wall</p>
            </div>
            <div className="flex gap-2 p-2 rounded-sm">
              <div>{">"}</div>
              <p>Todo</p>
            </div>
          </div>
        </div>
      </div>
      <div className="2xl:hidden">
        <svg
          width="30px"
          height="30px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 18L20 18"
            stroke="#000000"
            stroke-width="2"
            stroke-linecap="round"
          />
          <path
            d="M4 12L20 12"
            stroke="#000000"
            stroke-width="2"
            stroke-linecap="round"
          />
          <path
            d="M4 6L20 6"
            stroke="#000000"
            stroke-width="2"
            stroke-linecap="round"
          />
        </svg>
      </div>
      <div className="flex flex-col gap-6">
        <h1 className="text-3xl font-bold">Sticky Wall</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div className="bg-yellow-100 p-4 rounded-md shadow-m sm:aspect-squared">
            <h3 className="text-lg font-semibold">Social Media</h3>
            <div>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
              commodo ligula eget dolor. Aenean massa. Cum sociis natoque
              penatibus et magnis dis parturient montes, nascetur ridiculus mus.
              Donec qu
            </div>
          </div>
          <div className="bg-blue-100 p-4 rounded-md shadow-md sm:aspect-square">
            <h3 className="text-lg font-semibold">Social Media</h3>
            <div>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
              commodo ligula eget dolor. Aenean massa. Cum sociis natoque
              penatibus et magnis dis parturient montes, nascetur ridiculus mus.
              Donec qu
            </div>
          </div>
          <div className="bg-pink-100 p-4 rounded-md shadow-md sm:aspect-square">
            <h3 className="text-lg font-semibold">Social Media</h3>
            <div>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
              commodo ligula eget dolor. Aenean massa. Cum sociis natoque
              penatibus et magnis dis parturient montes, nascetur ridiculus mus.
              Donec qu
            </div>
          </div>
          {/*  */}
          <div className="bg-pink-100 p-4 rounded-md shadow-md sm:aspect-square">
            <h3 className="text-lg font-semibold">Social Media</h3>
            <div>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
              commodo ligula eget dolor. Aenean massa. Cum sociis natoque
              penatibus et magnis dis parturient montes, nascetur ridiculus mus.
              Donec qu
            </div>
          </div>
          <div className="bg-pink-100 p-4 rounded-md shadow-md sm:aspect-square">
            <h3 className="text-lg font-semibold">Social Media</h3>
            <div>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
              commodo ligula eget dolor. Aenean massa. Cum sociis natoque
              penatibus et magnis dis parturient montes, nascetur ridiculus mus.
              Donec qu
            </div>
          </div>
          <div className="bg-pink-100 p-4 rounded-md shadow-md sm:aspect-square">
            <h3 className="text-lg font-semibold">Social Media</h3>
            <div>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
              commodo ligula eget dolor. Aenean massa. Cum sociis natoque
              penatibus et magnis dis parturient montes, nascetur ridiculus mus.
              Donec qu
            </div>
          </div>
          <div className="bg-pink-100 p-4 rounded-md shadow-md sm:aspect-square">
            <h3 className="text-lg font-semibold">Social Media</h3>
            <div>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
              commodo ligula eget dolor. Aenean massa. Cum sociis natoque
              penatibus et magnis dis parturient montes, nascetur ridiculus mus.
              Donec qu
            </div>
          </div>
          <div className="bg-pink-100 p-4 rounded-md shadow-md sm:aspect-square">
            <h3 className="text-lg font-semibold">Social Media</h3>
            <div>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
              commodo ligula eget dolor. Aenean massa. Cum sociis natoque
              penatibus et magnis dis parturient montes, nascetur ridiculus mus.
              Donec qu
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
