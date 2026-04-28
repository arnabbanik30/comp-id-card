import { Input } from '../../input';
import { Field, FieldLabel } from '../../field';
import { idCardConfigStore } from '#/stores/id-card-config';

export function IdCardHeaderConfig() {
  return (
    <div className="max-w-[400px] p-4 flex flex-col">
      <span className="text-xl py-2">Header</span>
      <Field>
        <FieldLabel>Competition Date</FieldLabel>
        <Input
          type="text"
          onChange={(event) =>
            idCardConfigStore.setState((prev) => ({
              ...prev,
              header: { ...prev.header, compDate: event.target.value },
            }))
          }
        />
      </Field>
      <Field>
        <FieldLabel>Competition Venue</FieldLabel>
        <Input
          type="text"
          onChange={(event) =>
            idCardConfigStore.setState((prev) => ({
              ...prev,
              header: { ...prev.header, venueName: event.target.value },
            }))
          }
        />
      </Field>
    </div>
  );
}
