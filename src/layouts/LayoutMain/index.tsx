const LayoutMain = ({ Component }: any) => {
    return (
        <div>
            <header>
                <h1>Header</h1>
            </header>
            <main>
                <Component />
            </main>
            <footer>
                <h1>Footer</h1>
            </footer>
        </div>
    )
}

export default LayoutMain