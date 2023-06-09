declare module "*.svg" {
  import React, { FC } from "react";
  const ReactComponent: FC<React.SVGProps<SVGSVGElement>>;
  export default ReactComponent;
  export { ReactComponent };
}
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_TESTNET_HOST: string;
  readonly VITE_BACKEND_HOST: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
