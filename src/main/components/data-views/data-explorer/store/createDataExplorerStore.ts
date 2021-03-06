// external imports
import { initStore } from 'js-stores'
import { Observable } from 'rxjs'
import { take  } from 'rxjs/operators'

// internal imports
import DataExplorerStore from '../types/DataExplorerStore'
import DataExplorerFilter from '../types/DataExplorerFilter'
import DataExplorerQueryParams from '../types/DataExplorerQueryParams'
import DataExplorerQueryResult from '../types/DataExplorerQueryResult'

// ---createDataExplorerStore ---------------------------------------

function createDataExplorerStore(): DataExplorerStore {
  let timeout: any

  const [self, update] = initStore<DataExplorerStore>({
    isInitialized: false,
    isLoading: false,
    data: [],
    pageIndex: 0,
    pageSize: 50,
    totalItemCount: null,
    sortBy: null,
    sortDir: 'asc', 
    filter: null,
    rowSelection: [],
    errorMessage: null,

    setRowSelection(rowSelection) {
      update(() => {
        self.rowSelection = rowSelection
      })
    },

    loadPage(pageIndex, loadData, onSuccess) {
      return fetchData({
        pageIndex,
        pageSize: self.pageSize,
        sortBy: self.sortBy,
        sortDir: self.sortDir,
        filter: self.filter,
        loadData,
        onSuccess
      })
    },

    loadPageSize(pageSize, loadData, onSuccess) {
      fetchData({
        pageIndex: 0,
        pageSize,
        sortBy: self.sortBy,
        sortDir: self.sortDir,
        filter: self.filter,
        loadData,
        onSuccess
      })
    },

    loadSorting(sortBy, sortDir, loadData, onSuccess) {
      fetchData({
        pageIndex: 0,
        pageSize: self.pageSize,
        sortBy: sortBy,
        sortDir: sortDir,
        filter: self.filter,
        loadData,
        onSuccess
      })
    },

    loadFilter(filter, loadData, onSuccess) {
      fetchData({
        pageIndex: 0,
        pageSize: self.pageSize,
        sortBy: self.sortBy,
        sortDir: self.sortDir,
        filter: filter,
        loadData,
        onSuccess
      })
    }
  })

  function fetchData(params: {
    pageIndex: number,
    pageSize: number,
    sortBy: string | null,
    sortDir: 'asc' | 'desc',
    filter: DataExplorerFilter | null,
    loadData: (params: DataExplorerQueryParams) => Observable<DataExplorerQueryResult>,
    onSuccess?: () => void
  }) {
    console.log('fetchData:', params)
    const observer = params.loadData({
      offset: params.pageIndex * params.pageSize,
      count: params.pageSize,
      sortBy: params.sortBy,
      sortDir: params.sortDir,
      filter: params.filter
    }).pipe(take(1))

    timeout = setTimeout(() => {
      clearTimeout(timeout)
      
      update(() => {
        self.isLoading =true
      })
    }, 100)

    const subscription = observer.subscribe({
      next: (result: any) => {
        update(() => {
          self.isLoading = false,
          self.errorMessage = null,
          self.pageIndex = params.pageIndex,
          self.pageSize = params.pageSize,
          self.sortBy = params.sortBy,
          self.sortDir = params.sortDir,
          self.filter = params.filter,
          self.isInitialized = true,
          self.data = result.data,
          self.totalItemCount = result.totalItemCount,
          self.rowSelection = []
        })

        if (params.onSuccess) {
          params.onSuccess()
        }
      },
      complete: () => {
        if (timeout) {
          clearTimeout(timeout)
          timeout = null
        }
      },
      error: (e: any) => {
         update(() => {
          self.isLoading = false,
          self.errorMessage = String(e) // TODO
        })
      }
    })
  }

  return self
}

// --- exports ------------------------------------------------------

export default createDataExplorerStore
