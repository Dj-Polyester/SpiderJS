INCDIR =./include
OBJDIR =./obj
SRCDIR = ./src
MAIN = main

CC=gcc -g
GTK = `pkg-config --cflags --libs gtk+-3.0` -export-dynamic 
GTK2 = `pkg-config --cflags --libs gtk+-2.0` -export-dynamic
CFLAGS=-I$(INCDIR) -I$(OBJDIR) 
LIBS = -ljson-c -lvte-2.91


_OBJ = app.o signals.o main.o 
OBJ = $(patsubst %,$(OBJDIR)/%,$(_OBJ))
_INC = app.h global.h signals.h 
INC = $(patsubst %,$(INCDIR)/%,$(_INC))

all: clean gresource main #exec

$(MAIN): $(OBJ)
	$(CC) $^ -o $@  $(CFLAGS) $(GTK) $(LIBS)

gresource:
	glib-compile-resources --target=$(SRCDIR)/app.c --generate-source app.gresource.xml
	glib-compile-resources --target=$(INCDIR)/app.h --generate-header app.gresource.xml

$(OBJDIR)/%.o: $(SRCDIR)/%.c 
	$(CC) -c $^ -o $@ $(CFLAGS) $(GTK)

exec:
	./$(MAIN)

.PHONY: clean gresource

clean:
	clear
	$(RM) $(MAIN) $(INCDIR)/app.h $(SRCDIR)/app.c $(OBJDIR)/*.o *~ core $(INCDIR)/*~

