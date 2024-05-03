import Card from "@mui/material/Card";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import { UserCirclePlus } from "@phosphor-icons/react/dist/ssr/UserCirclePlus";
import { Lock } from "@phosphor-icons/react/dist/ssr";
import { EnvelopeSimple } from "@phosphor-icons/react/dist/ssr";
import { PesquisaProps } from "../../types";

export default function Input({
  placeholder,
  handleInput,
  type,
}: PesquisaProps) {
  let icon = <UserCirclePlus fontSize="var(--icon-fontSize-md)" />;
  switch (type) {
    case "password":
      icon = <Lock fontSize="var(--icon-fontSize-md)" />;
      break;
    case "email":
      icon = <EnvelopeSimple fontSize="var(--icon-fontSize-md)" />;
      break;
  }

  return (
    <Card>
      <OutlinedInput
        defaultValue=""
        fullWidth
        placeholder={placeholder}
        type={type}
        startAdornment={
          <InputAdornment position="start">{icon}</InputAdornment>
        }
        sx={{ maxWidth: "500px" }}
        onChange={(e) => handleInput(e.target.value)}
      />
    </Card>
  );
}
