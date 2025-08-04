import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate, useParams } from "@tanstack/react-router";

export const PlatformSelect = () => {
  const { platform } = useParams({ from: "/$platform/s/" });
  const navigate = useNavigate();

  const handleOnPlatformChange = (value: string) => {
    navigate({ to: "/$platform/s", params: { platform: value } });
  };

  return (
    <Select defaultValue={platform} onValueChange={handleOnPlatformChange}>
      <SelectTrigger className="w-28">
        <SelectValue placeholder="Platform" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="br1">BR1</SelectItem>
        <SelectItem value="eun1">EUN1</SelectItem>
        <SelectItem value="euw1">EUW1</SelectItem>
        <SelectItem value="jp1">JP1</SelectItem>
        <SelectItem value="kr">KR</SelectItem>
        <SelectItem value="la1">LA1</SelectItem>
        <SelectItem value="la2">LA2</SelectItem>
        <SelectItem value="na1">NA1</SelectItem>
        <SelectItem value="oc1">OC1</SelectItem>
        <SelectItem value="ph2">PH2</SelectItem>
        <SelectItem value="ru">RU</SelectItem>
        <SelectItem value="sg2">SG2</SelectItem>
        <SelectItem value="th2">TH2</SelectItem>
        <SelectItem value="tr1">TR1</SelectItem>
        <SelectItem value="tw2">TW2</SelectItem>
        <SelectItem value="vn2">VN2</SelectItem>
      </SelectContent>
    </Select>
  );
};
