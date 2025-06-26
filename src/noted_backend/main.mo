import Array "mo:base/Array";
import Time "mo:base/Time";

actor {
    type Note = {
        id: Nat;
        title: Text;
        content: Text;
        timestamp: Int;
    };

    stable var notes: [Note] = [];

    public func addNote(title: Text, content: Text) : async Nat {
        let id = notes.size();
        notes := Array.append(notes, [{id; title; content; timestamp = Time.now()}]);
        id
    };

    public query func getNotes() : async [Note] {
        notes
    };

    public func updateNote(id: Nat, title: Text, content: Text) : async Bool {
        let updated = Array.map<Note, Note>(notes, func (note) {
            if (note.id == id) { {id; title; content; timestamp = Time.now()}} else {
                note
            }
        });
        if (notes.size() == updated.size()) {
            notes := updated;
            true
        } else {
            false
        }
    };

    public func deleteNote(id: Nat) : async Bool {
        let originalLength = notes.size();
        notes := Array.filter<Note>(notes, func (note) {
            note.id != id
        });
        notes.size() < originalLength
    }
}