import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbSeparator,
} from './ui/breadcrumb';
import { MyBreadcrumbPropsInterface } from '@/helpers/interfaces';

const MyBreadcrumb: React.FC<MyBreadcrumbPropsInterface> = ({ words }) => {
  if (words.length < 2) return null;
  return (
    <Breadcrumb className="pb-2 pt-0 ">
      <BreadcrumbList>
        {words.length > 3 ? (
          <>
            <BreadcrumbItem key="first">{words[0]}</BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbEllipsis />
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem key="second-to-last">
              {words[words.length - 2]}
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem key="last">
              {words[words.length - 1]}
            </BreadcrumbItem>
          </>
        ) : (
          words.map((word, index) => (
            <>
              {index > 0 && <BreadcrumbSeparator />}
              <BreadcrumbItem key={index}>{word}</BreadcrumbItem>
            </>
          ))
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default MyBreadcrumb;
