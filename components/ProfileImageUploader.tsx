import { Control } from "react-hook-form";
import { FormData } from "@/types/formTypes";
import FileUploader from "@/components/FileUploader";

const ProfileImageUploader = ({ control }: { control: Control<FormData> }) => (
  <section className="space-y-6">
    <div className="mb-9 space-y-1">
      <h2 className="sub-header">Upload Profile Image</h2>
    </div>
    <FileUploader
      name="profileImage"
      control={control}
      label="Upload your profile picture"
      files={undefined}
      onChange={function (_files: File[]): void {
        throw new Error("Function not implemented.");
      }}
    />
  </section>
);

export default ProfileImageUploader;
