import * as React from 'react';

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

const createBreadCrumb = (words: string[]) => {
  return (
    <Breadcrumb className="pb-6">
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

export default function DigDeeperCard(props: any) {
  return (
    <Card className="w-full">
      <CardHeader>
        {props.wordStack ? (
          createBreadCrumb(props.wordStack)
        ) : (
          <div className="pb-6"></div>
        )}

        <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent></CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter>
    </Card>
  );
}
