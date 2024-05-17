import AddWordLogic from '@/components/AddWordLogic';

const addWord = () => {
  return (
    <div
      className="min-h-screen flex flex-col items-center bg-gray-100 px-4"
      style={{
        paddingTop: '20px',
        paddingBottom: '100px',
      }}
    >
      <div className="w-full max-w-md p-8 space-y-4 bg-white rounded shadow-lg flex-grow flex flex-col">
        <h1 className="text-center text-2xl font-bold pb-4">
          Rabbit Hole Dictionary
        </h1>
        <div className="flex-grow flex flex-col">
          <AddWordLogic />
        </div>
      </div>
    </div>
  );
};

export default addWord;
