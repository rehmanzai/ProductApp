function Loader({ label = 'Loading products' }) {
	return (
		<div className="grid min-h-64 place-items-center py-12" role="status" aria-live="polite">
			<div className="flex flex-col items-center gap-4 text-sm font-medium text-[var(--muted)]">
				<span className="size-9 animate-spin rounded-full border-[3px] border-[var(--cream-dark)] border-t-[var(--terracotta)]" />
				{label}
			</div>
		</div>
	)
}

export default Loader
