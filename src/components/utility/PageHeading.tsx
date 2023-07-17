type HeadingProps = {
  children: React.ReactNode
}

const PageHeading = (props: HeadingProps) => {
  return (
    <h2 className="text-xl text-center pt-4 pb-4 text-chiknred">
      {props.children}
    </h2>
  )
}

export default PageHeading
