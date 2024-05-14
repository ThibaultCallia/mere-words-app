import * as React from 'react';
import { WordDetailInterface } from '@/helpers/interfaces';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Switch } from '@/components/ui/switch';

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
import MyBreadcrumb from './MyBreadCrumb';
import WordResult from './WordResult';
import { DigDeeperCardInterface } from '@/helpers/interfaces';

const DigDeeperCard: React.FC<DigDeeperCardInterface> = ({
  wordStack,
  loading,
}) => {
  const lastWord = wordStack.peek();

  if (wordStack.isEmpty() && !loading) {
    return (
      <Card className="w-full h-full flex items-center justify-center">
        <CardContent className="flex items-center">
          <Image src="/Rabbit.jpg" alt="Rabbit" width={35} height={20} />
          <span className="ml-4 text-black text-lg">Down the rabbit hole</span>
        </CardContent>
      </Card>
    );
  }

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
              <MyBreadcrumb words={wordStack.getAllWords()} />
            </CardHeader>
            {lastWord ? <WordResult result={lastWord} /> : null}
            <CardFooter className="flex justify-between">
              <Button variant="outline">Back</Button>
              <div className="flex gap-2">
                <Label
                  htmlFor="rabbitHoleSwitch"
                  className="flex self-center text-xs"
                >
                  Rabbit Hole
                </Label>
                <Switch id="rabbitHoleSwitch">test</Switch>
              </div>
            </CardFooter>
          </>
        )}
      </Card>
    </>
  );
};

export default DigDeeperCard;
