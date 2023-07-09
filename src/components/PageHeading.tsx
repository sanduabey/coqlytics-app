type HeadingProps = {
  children: React.ReactNode
}

const PageHeading = (props: HeadingProps) => {
  return (
    <h2 className="text-xl text-center pt-10 text-blue-200">
      {props.children}
    </h2>
  )
}

export default PageHeading
