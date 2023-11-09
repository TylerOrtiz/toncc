import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="page-content">
        <h1 className="font-weight-light">Welcome to TON Custom Carpentry!</h1>
        <h2 className="font-weight-light">Check out some of our work!</h2>

        <div className="row">
          <div className="col-12 col-md-9 mx-auto">
            {/* <ngx-gallery [options]="galleryOptions" [images]="imagesCollection"></ngx-gallery> */}
          </div>
        </div>
      </div>
    </main>
  )
}
