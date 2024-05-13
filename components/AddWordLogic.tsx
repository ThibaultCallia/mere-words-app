import AddWordForm from './AddWordForm';
import DigDeeperCard from './DigDeeperCard';

const AddWordLogic = (props: any) => {
  return (
    <div className="flex flex-col gap-3">
      <AddWordForm />
      <DigDeeperCard />
    </div>
  );
};

export default AddWordLogic;
