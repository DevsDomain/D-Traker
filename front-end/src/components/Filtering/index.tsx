interface Column {
    field: string;
    // outras propriedades, se houver
  }
  
  // Dentro de CustomHeaderFilterSingleDataGridPro
  const columns = React.useMemo(
    () =>
      data.columns.map((colDef: Column) => { // Aqui fornecemos o tipo Column para colDef
        if (colDef.field === 'isAdmin') {
          return {
            ...colDef,
            width: 200,
            renderHeaderFilter: (params: GridRenderHeaderFilterProps) => (
              <AdminFilter {...params} />
            ),
          };
        }
        if (colDef.field === 'phone') {
          // no header filter for `phone` field
          return { ...colDef, renderHeaderFilter: () => null };
        }
        return colDef;
      }),
    [data.columns],
  );
  