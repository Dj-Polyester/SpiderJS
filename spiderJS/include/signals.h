#include "global.h"

size_t file_count(FILE* fptr);
void read_json();
void	on_destroy();
void on_search_clicked (GtkComboBox *widget,
               Application* user_data);
void connect_signals();