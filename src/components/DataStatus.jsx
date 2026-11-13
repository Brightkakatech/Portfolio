/**
 * Shown while a page's JSON data is loading, or if it failed to load.
 * Shared by every page that uses useJsonData, so they all behave the same.
 * @param {object} props
 * @param {string} props.error - The error message, or "" while still loading.
 */
function DataStatus({ error }) {
  if (error) {
    return (
      <p className="notice notice-error" role="alert">
        {error}
      </p>
    );
  }
  return <p className="page-intro">Loading…</p>;
}

export default DataStatus;
