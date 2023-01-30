import { useState } from "react";
import { useBreakpoints } from "@coral-xyz/app-extension/src/components/common/Layout/hooks";
import { useCustomTheme } from "@coral-xyz/themes";
import CloseIcon from "@mui/icons-material/Close";
import DownloadIcon from "@mui/icons-material/Download";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import { Box, Modal } from "@mui/material";

export const MediaContent = ({
  mediaLink,
  mediaKind,
}: {
  mediaLink: string;
  mediaKind: string;
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const theme = useCustomTheme();
  const { isXs } = useBreakpoints();

  return (
    <>
      {modalOpen && (
        <Modal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          componentsProps={{
            backdrop: {
              style: {
                background: "rgba(24, 24, 27, 0.9)",
                backdropFilter: "blur(5px)",
              },
            },
          }}
        >
          <Box
            sx={{
              width: "100vw",
              height: "100vh",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              p: isXs ? 1 : 3,
              outline: "none",
            }}
          >
            <CloseIcon
              style={{
                color: theme.custom.colors.icon,
                cursor: "pointer",
                alignSelf: "flex-end",
                marginTop: 10,
              }}
              onClick={() => setModalOpen(false)}
            />
            {mediaKind === "video" ? (
              <video
                style={{
                  borderRadius: 15,
                  objectFit: "contain",
                  maxHeight: "85vh",
                  padding: 10,
                }}
                controls={true}
                src={mediaLink}
              />
            ) : (
              <img
                style={{
                  borderRadius: 15,
                  objectFit: "contain",
                  maxHeight: "85vh",
                  padding: 10,
                }}
                src={mediaLink}
              />
            )}
            <a
              style={{ alignSelf: "flex-end", marginBottom: 10 }}
              href={mediaLink}
              download="AwesomeImage.png"
            >
              <DownloadIcon
                style={{ color: theme.custom.colors.icon, cursor: "pointer" }}
                onClick={() => setModalOpen(false)}
              />
            </a>
          </Box>
        </Modal>
      )}
      <div style={{ marginTop: 3 }}>
        {mediaKind === "video" ? (
          <div style={{ display: "flex" }}>
            <div style={{ position: "relative" }}>
              <video
                style={{
                  height: !isXs ? 270 : 180,
                  maxWidth: !isXs ? 375 : 250,
                  borderRadius: 5,
                }}
                controls={true}
                src={mediaLink}
              />
              <div
                style={{
                  cursor: "pointer",
                  position: "absolute",
                  right: "0%",
                  top: "0%",
                  bottom: "0%",
                  margin: "auto",
                }}
                onClick={(e) => {
                  setModalOpen(true);
                  e.preventDefault();
                }}
              >
                <OpenInFullIcon
                  style={{ color: theme.custom.colors.icon, margin: 3 }}
                />
              </div>
            </div>
          </div>
        ) : (
          <img
            onClick={() => setModalOpen(true)}
            style={{
              height: "full",
              maxWidth: !isXs ? 375 : "60vw",
              borderRadius: 5,
              marginTop: 5,
              objectFit: "contain",
              cursor: "pointer",
            }}
            src={mediaLink}
          />
        )}
      </div>
    </>
  );
};