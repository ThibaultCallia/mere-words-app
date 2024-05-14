import {
  WordResultPropsInterface,
  WordDetailInterface,
} from '@/helpers/interfaces';
import {
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';

const WordResult: React.FC<WordResultPropsInterface> = ({ result }) => {
  const { word, phoneticText, definitions } = result;
  return (
    <>
      <CardHeader className="flex py-0.5 text-2xl">
        <CardTitle>{word}</CardTitle>
      </CardHeader>
      <CardContent className="pt-5">
        <CardDescription>{definitions[0].definition}</CardDescription>
      </CardContent>
    </>
  );
};

export default WordResult;
