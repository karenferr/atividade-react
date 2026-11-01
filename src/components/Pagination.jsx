export default function Pagination({ totalPages, currentPage, onPageChange }) {
  if (totalPages <= 1) return null;

  return (
    <nav className="pagination" aria-label="Paginação das tarefas">
      <button
        className="page-button"
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Ir para página anterior"
      >
        ‹
      </button>
      {Array.from({ length: totalPages }, (_, index) => index + 1).map(page => (
        <button
          key={page}
          className={`page-button ${currentPage === page ? "active" : ""}`}
          type="button"
          onClick={() => onPageChange(page)}
          aria-current={currentPage === page ? "page" : undefined}
          aria-label={`Página ${page}`}
        >
          {page}
        </button>
      ))}
      <button
        className="page-button"
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Ir para próxima página"
      >
        ›
      </button>
    </nav>
  );
}
