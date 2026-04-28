import { Card, CardHeader, CardTitle } from '../../card';
import { IdCardHeaderConfig } from './IdCardHeaderConfig';

export function ConfigCard() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Config</CardTitle>
      </CardHeader>
      <IdCardHeaderConfig />
    </Card>
  );
}
