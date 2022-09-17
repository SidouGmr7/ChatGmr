function Spinner() {
  return (
    <div className='fixed top-0 right-0 bottom-0 left-0 flex justify-center items-center'>
      <div className='loadingSpinner animate-spin w-16 h-16 border-8 border-solid rounded-full'></div>
    </div>
  )
}

export default Spinner
