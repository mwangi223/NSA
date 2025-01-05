import SubmitButton from "@/components/SubmitButton";

const SubmitSection = ({ isLoading }: { isLoading: boolean }) => (
  <section className="flex justify-end gap-2 pt-8">
    <SubmitButton isLoading={isLoading} children={undefined} />
  </section>
);

export default SubmitSection;