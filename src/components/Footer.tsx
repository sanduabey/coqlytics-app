export default function Footer() {
  const date = new Date()
  const year = date.getFullYear()
  return (
    <div className="text-gray-400 flex justify-between">
      <p className="pl-3">
        &copy; {year} <a href="https://coqlytics.xyz">Coqlytics.xyz</a>
      </p>
      <p className="justify-center text-center ">
        Built by{' '}
        <a href="https://twitter.com/dr_vktor" target="_blank">
          @Vktor
        </a>
      </p>
      <p className="pr-3 justify-end">v.{`${process.env.APP_VERSION}`}</p>
    </div>
  )
}
