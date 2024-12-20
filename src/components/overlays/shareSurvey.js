import React, { useState } from "react";
import styles from "@/styles/shareSurvey.module.css";
import { IoCloseOutline } from "react-icons/io5";
import Image from "next/image";
import { BiSolidCopy } from "react-icons/bi";
import { RiWhatsappFill } from "react-icons/ri";
import { FaFacebook } from "react-icons/fa";
import { AiFillTwitterCircle } from "react-icons/ai";
import { FaTelegram } from "react-icons/fa6";

const ShareModal = ({ onClose, onCopyLink, surveyResultsID }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    setIsCopied(true);
    onCopyLink();
  };

  const shareLinks = [
    {
      href: `https://web.facebook.com/sharer.php?u=${process.env.BASE_URL}/relationship/love-compatibility?surveyEvaluateID=${surveyResultsID}`,
      icon: <FaFacebook color="#0084FF" size={40} />,
    },
    {
      href: `https://twitter.com/intent/tweet?text=Check this out&url=${process.env.BASE_URL}/relationship/love-compatibility?surveyEvaluateID=${surveyResultsID}`,
      icon: <AiFillTwitterCircle color="#1DA1F2" size={42} />,
    },
    {
      href: `https://t.me/share/url?url=${process.env.BASE_URL}/relationship/love-compatibility?surveyEvaluateID=${surveyResultsID}&text=Check this out`,
      icon: <FaTelegram color="#0088cc" size={40} />,
    },
    {
      href: `whatsapp://send?text=${process.env.BASE_URL}/relationship/love-compatibility?surveyEvaluateID=${surveyResultsID}`,
      icon: <RiWhatsappFill color="#25D366" size={40} />,
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.titleRow}>
          <div className={styles.title}>Share</div>
          <div className={styles.closeButton} onClick={onClose}>
            <IoCloseOutline size={32} />
          </div>
        </div>
        <hr className={styles.hrStyle} />
      </div>

      <div className={styles.image}>
        <Image
          src="/images/socialShare.svg"
          alt="Share Illustration"
          layout="responsive"
          width={320}
          height={320}
        />
      </div>

      <div className={styles.shareIconsContainer}>
        {shareLinks.map((link, index) => (
          <a
            key={index}
            target="_blank"
            href={link.href}
            className="p-2 text-gray-600 border rounded-lg dark:hover:bg-gray-800 dark:text-white hover:bg-gray-100"
            rel="noopener noreferrer"
          >
            {link.icon}
          </a>
        ))}
      </div>

      <div className={styles.linkShare}>
        <span>
          {isCopied ? "Link copied" : "https://www.aid&Heal.com/....."}
        </span>
        <div
          className={styles.copyIconContainer}
          style={{ padding: "5px", borderRadius: "8px" }}
          onClick={handleCopy}
        >
          <BiSolidCopy color={isCopied ? "#0E8E72" : "#B1B5B7"} size={24} />
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
