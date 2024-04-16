function Content({ children }) {
  return (
    <div className="border rounded-lg mt-[20px] p-5 w-full h-full">
      <div>{children}</div>
    </div>
  );
}

export default Content;
