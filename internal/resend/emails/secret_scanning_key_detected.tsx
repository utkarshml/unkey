import { Html } from "@react-email/html";
import { Text } from "@react-email/text";
import React from "react";

export function SecretScanningKeyDetected() {
  return (
    <Html>
      <Text>Key detected </Text>
    </Html>
  );
}
