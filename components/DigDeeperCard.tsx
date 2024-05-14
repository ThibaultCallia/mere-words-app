import * as React from 'react';
import { WordDetailInterface } from '@/helpers/interfaces';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from '@/components/ui/breadcrumb';
import MySkeleton from './MySkeleton';
import { DigDeeperCardInterface } from '@/helpers/interfaces';

const createBreadCrumb = (words: string[]) => {
  if (words.length < 2) return null;
  return (
    <Breadcrumb className="pb-6 ">
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

const createWordDetail = (wordDetail: any) => {};

const DigDeeperCard: React.FC<DigDeeperCardInterface> = ({
  wordStack,
  loading,
}) => {
  return (
    <>
      <Card className="w-full">
        {loading ? (
          <CardContent>
            <MySkeleton />
          </CardContent>
        ) : (
          <>
            <CardHeader className="flex">
              {createBreadCrumb(wordStack.getAllWords())}

              <CardTitle>Create project</CardTitle>
              <CardDescription>
                Deploy your new project in one-click.
              </CardDescription>
            </CardHeader>
            <CardContent></CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Cancel</Button>
              <Button>Deploy</Button>
            </CardFooter>
          </>
        )}
      </Card>
    </>
  );
};

export default DigDeeperCard;
