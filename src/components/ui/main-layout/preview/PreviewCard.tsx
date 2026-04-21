import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../tabs';
import { Card, CardContent, CardHeader, CardTitle } from '../../card';
import { SingleTab } from './SingleTab';

export function PreviewCard() {
  return (
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle>Preview</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs
          className="w-full"
          defaultValue="single"
        >
          <TabsList variant="default">
            <TabsTrigger value="single">Single</TabsTrigger>
            <TabsTrigger value="full-page"> Full Page</TabsTrigger>
          </TabsList>
          <TabsContent value="single">
            <SingleTab />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
