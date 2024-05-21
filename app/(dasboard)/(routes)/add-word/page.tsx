import AddWordLogic from '@/components/AddWordLogic';
import { Toaster } from '@/components/ui/toaster';
import { getCurrentUser } from '@/helpers/helperFunctions';

const addWord = async () => {
  const { id: currentUserId } = await getCurrentUser();
  return (
    <div
      className="min-h-screen flex flex-col items-center bg-gray-100 px-4"
      style={{
        paddingTop: '20px',
        paddingBottom: '100px',
      }}
    >
      <div className="w-full max-w-lg p-8 space-y-4 bg-white rounded shadow-lg flex-grow flex flex-col">
        <h1 className="text-center text-2xl font-bold pb-4">
          Rabbit Hole Dictionary
        </h1>

        <div className="flex flex-col flex-grow h-full">
          <AddWordLogic userId={currentUserId} />
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default addWord;
