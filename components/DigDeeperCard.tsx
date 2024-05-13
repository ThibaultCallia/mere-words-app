import * as React from 'react';
import { WordDetailInterface } from '@/helpers/helperFunctions';
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

const createBreadCrumb = (words: WordDetailInterface[]) => {
  if (words.length < 2) return null;
  return (
    <Breadcrumb className="pb-6 ">
      <BreadcrumbList>
        {words.length > 3 ? (
          <>
            <BreadcrumbItem key="first">{words[0].word}</BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbEllipsis />
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem key="second-to-last">
              {words[words.length - 2].word}
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem key="last">
              {words[words.length - 1].word}
            </BreadcrumbItem>
          </>
        ) : (
          words.map((wordObject, index) => (
            <>
              {index > 0 && <BreadcrumbSeparator />}
              <BreadcrumbItem key={index}>{wordObject.word}</BreadcrumbItem>
            </>
          ))
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

const createWordDetail = (wordDetail: any) => {};

export default function DigDeeperCard(props: any) {
  return (
    <>
      <Card className="w-full">
        {props.loading ? (
          <CardContent>
            <MySkeleton />
          </CardContent>
        ) : (
          <>
            <CardHeader className="flex">
              {createBreadCrumb(props.wordStack)}

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
}
