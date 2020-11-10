interface returnType {
  id: number;
  value: "Weak" | "Medium" | "Strong";
  contains: [];
  length: number;
}

declare module "check-password-strength" {
  export default function (password: string): returnType;
}
