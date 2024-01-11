"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { useFormStatus } from "react-dom";

import { Loading } from "@/components/dashboard/loading";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { updateIpWhitelist } from "./actions";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Workspace } from "@unkey/db";
import Link from "next/link";
type Props = {
  workspace: {
    features: Workspace["features"];
  };
  api: {
    id: string;
    workspaceId: string;
    name: string;
    ipWhitelist: string | null;
  };
};

export const UpdateIpWhitelist: React.FC<Props> = ({ api, workspace }) => {
  const { toast } = useToast();
  const { pending } = useFormStatus();
  const router = useRouter();
  const whitelistingEnabledForWorkspace = workspace.features.ipWhitelist === true;

  const updateIps = trpc.apiSettings.updateIpWhitelist.useMutation({
    onSuccess: (_data) => {
      toast({
        title: "Success",
        description: "Your ip whitelist has been updated!",
      });
      router.refresh();
    },
    onError: (err, variables) => {
      toast({
        title: `Could not update ip whitelist on ApiId ${variables.apiId}`,
        description: err.message,
        variant: "alert",
      });
    },
  });

  return (
    <form
      action={async (formData: FormData) => {
        const res = await updateIpWhitelist(formData);
        if (res.error) {
          toast({
            title: "Error",
            description: res.error.message,
            variant: "alert",
          });
          return;
        }
        toast({
          title: "Success",
          description: "Api name updated",
        });
      }}
    >
      <Card>
        <CardHeader className={cn({ "opacity-40": !whitelistingEnabledForWorkspace })}>
          <CardTitle>IP Whitelist</CardTitle>
          <CardDescription>
            Protect your keys from being verified by unauthorized sources. Enter your IP addresses
            either comma or newline separated.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {whitelistingEnabledForWorkspace ? (
            <div className="flex flex-col space-y-2">
              <input type="hidden" name="workspaceId" value={api.workspaceId} />
              <input type="hidden" name="apiId" value={api.id} />
              <label className="hidden sr-only">Name</label>
              <Textarea
                name="ipWhitelist"
                className="max-w-sm"
                defaultValue={api.ipWhitelist ?? ""}
                autoComplete="off"
                placeholder={`127.0.0.1
1.1.1.1`}
              />
            </div>
          ) : (
            <Alert className="flex items-center justify-between opacity-100">
              <div>
                <AlertTitle>Enterprise Feature</AlertTitle>
                <AlertDescription>
                  Contact us if you'd like IP whitelisting enabled on your plan.
                </AlertDescription>
              </div>
              <Link href="mailto:support@unkey.dev">
                <Button>Contact</Button>
              </Link>
            </Alert>
          )}
        </CardContent>
        <CardFooter
          className={cn("justify-end", { "opacity-30 ": !whitelistingEnabledForWorkspace })}
        >
          <Button
            variant={!whitelistingEnabledForWorkspace || pending ? "disabled" : "primary"}
            type="submit"
            disabled={pending}
          >
            {pending ? <Loading /> : "Save"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};
