"use client";
import { detailShareConfig } from "@@/config/detail";
import { ShareOutlineIcon, ShareSolidIcon } from "@/icons";
import {
  CheckIcon,
  CopyIcon,
  FacebookIcon,
  LinkedinIcon,
  MailIcon,
  TwitterIcon,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Drawer } from "vaul";

const CopyButton = ({ url }) => {
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (copied) {
      const id = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(id);
    }
  }, [copied]);

  const copy = () => {
    setCopied(true);
    window.navigator.clipboard?.writeText(url);
  };

  return (
    <button
      type="button"
      title="Copy url to clipboard"
      onClick={copy}
      className="rounded-lg border-[1.75px] border-gray-300 bg-gray-50 p-5  shadow-sm transition-all hover:-translate-y-1 hover:bg-transparent hover:shadow-md"
    >
      {copied ? (
        <CheckIcon className="h-8 w-8 stroke-[1.5px] text-gray-400" />
      ) : (
        <CopyIcon className="h-8 w-8 stroke-[1.5px] text-gray-400" />
      )}
    </button>
  );
};

const DetailPostShareButton = ({ title = "", text = "", url = "" }) => {
  const [isHovering, setIsHovered] = React.useState(false);
  const onMouseEnter = () => setIsHovered(true);
  const onMouseLeave = () => setIsHovered(false);
  const [linkUrl, setLinkUrl] = useState("");

  useEffect(() => {
    setLinkUrl(window.location.href);
  }, []);
  return (
    <>
      <Drawer.Root shouldScaleBackground>
        <Drawer.Trigger asChild>
          <button
            type="button"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            className="group relative mx-auto inline-flex w-full items-center justify-center rounded-md border border-black/5 bg-[#0E8E72] py-2 hover:bg-gray-50 hover:shadow-sm eaiud"
            style={{ borderRadius: "16px" }}
          >
            {isHovering ? (
              <ShareSolidIcon className="-ml-0.5 h-5 w-5 text-gray-900" />
            ) : (
              <ShareOutlineIcon className="-ml-0.5 h-5 w-5 text-[#64A89C]" />
            )}
            <span className="ml-2 text-sm text-white group-hover:text-gray-900 md:flex">
              {detailShareConfig.title}
            </span>
          </button>
        </Drawer.Trigger>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Portal>
          <Drawer.Content className="fixed bottom-0 left-0 right-0 z-50 mt-24 flex flex-col rounded-t-[10px] bg-zinc-100">
            <div className="flex-1 rounded-t-[10px] bg-white p-4">
              <div className="mx-auto mb-8 h-1.5 w-12 flex-shrink-0 rounded-full bg-zinc-300" />
              <div className="mx-auto max-w-md">
                <Drawer.Title className="mx-auto mb-4 text-center font-sans text-lg font-semibold text-gray-600">
                  {detailShareConfig.title}
                </Drawer.Title>
                <div className="mx-auto my-6 grid grid-cols-3 justify-center gap-8">
                  <div className="mx-auto flex ">
                    <a
                      title={title}
                      target="_blank"
                      href={`https://twitter.com/intent/tweet?url=${url}&text=${encodeURIComponent(
                        title
                      )}`}
                      rel="noopener noreferrer"
                      className="rounded-lg border-[1.75px] border-gray-200 bg-gray-50 p-5 shadow-sm transition-all hover:-translate-y-1 hover:bg-transparent hover:shadow-md"
                    >
                      <TwitterIcon className="h-8 w-8 stroke-[1.5px] text-gray-400" />
                    </a>
                  </div>
                  <div className="mx-auto flex ">
                    <a
                      title={title}
                      target="_blank"
                      href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
                      rel="noopener noreferrer"
                      className="rounded-lg border-[1.75px] border-gray-200 bg-gray-50 p-5 shadow-sm transition-all hover:-translate-y-1 hover:bg-transparent hover:shadow-md"
                    >
                      <FacebookIcon className="h-8 w-8 stroke-[1.5px] text-gray-400" />
                    </a>
                  </div>
                  <div className="mx-auto flex ">
                    <a
                      title={title}
                      target="_blank"
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${url}`}
                      rel="noopener noreferrer"
                      className="rounded-lg border-[1.75px] border-gray-200 bg-gray-50 p-5 shadow-sm transition-all hover:-translate-y-1 hover:bg-transparent hover:shadow-md"
                    >
                      <LinkedinIcon className="h-8 w-8 stroke-[1.5px] text-gray-400" />
                    </a>
                  </div>

                  <div className="mx-auto flex ">
                    <a
                      title={title}
                      target="_blank"
                      href={`mailto:?subject=${encodeURIComponent(
                        title
                      )}&body=${encodeURIComponent(text + "\n\n")}${url}`}
                      rel="noopener noreferrer"
                      className="rounded-lg border-[1.75px] border-gray-200 bg-gray-50 p-5 shadow-sm transition-all hover:-translate-y-1 hover:bg-transparent hover:shadow-md"
                    >
                      <MailIcon className="h-8 w-8 stroke-[1.5px] text-gray-400" />
                    </a>
                  </div>

                  <div className="mx-auto flex ">
                    <CopyButton url={linkUrl} />
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50p-4 mt-auto border-t border-gray-200"></div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </>
  );
};

export default DetailPostShareButton;
