interface TodoDetailModalProps {
  title: string;
  description: string;
  isTodoDetailModalOpened: boolean;
  closeTodoDetailModal: () => void;
}

export const TodoDetailModal = ({
  title,
  description,
  isTodoDetailModalOpened,
  closeTodoDetailModal,
}: TodoDetailModalProps) => {
  if (!isTodoDetailModalOpened) return;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={(e) => e.target === e.currentTarget && closeTodoDetailModal()}
    >
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">In arrivo</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={closeTodoDetailModal}
              className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-500 text-xl cursor-pointer"
            >
              ×
            </button>
          </div>
        </div>
        <div className="p-6 overflow-y-auto">
          <div className="flex gap-4">
            <div className="flex-1 space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex-1">
                  <input
                    type="text"
                    value={title}
                    onChange={undefined}
                    className="text-lg font-medium w-full border-none outline-none resize-none bg-transparent"
                    placeholder="Nome attività"
                  />
                </div>
              </div>
              <div className="ml-8">
                <div className="flex items-center gap-2 text-gray-500 mb-2">
                  <span className="text-sm">📝</span>
                  <span className="text-sm">Descrizione</span>
                </div>
                <textarea
                  value={description}
                  onChange={undefined}
                  className="w-full p-2 border border-gray-200 rounded resize-none outline-none focus:border-blue-500"
                  rows={3}
                  placeholder="Aggiungi una descrizione..."
                />
              </div>
            </div>
          </div>
        </div>
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-end">
            <div className="flex gap-2">
              <button
                onClick={undefined}
                className="px-4 py-2 text-gray-600 hover:bg-gray-200 rounded"
              >
                Annulla
              </button>
              <button
                onClick={undefined}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Aggiorna attività
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
