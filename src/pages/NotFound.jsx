const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center h-full text-center p-4">
            <h1 className="text-6xl font-bold mb-4">404</h1>
            <p className="text-2xl mb-8">Page Not Found</p>
            <a href="/" className="px-4 py-2 bg-primary-500 text-white rounded hover:bg-primary-600 transition">
                Go to Home
            </a>
        </div>
    )
}

export default NotFound;