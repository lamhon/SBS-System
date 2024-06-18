import Content from "./content"

interface Params {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

async function Refresh(origin: Params) {
  console.log('originSSR-Refresh:', origin.searchParams.origin)
  return (
    <>
      <div className="vh-100 d-flex justify-content-center align-items-center">
        <div>
          <Content origin={Array.isArray(origin.searchParams.origin) ? origin.searchParams.origin[0] : origin.searchParams.origin ? origin.searchParams.origin : ''} />
        </div>
      </div>
    </>
  )
}

export default Refresh
