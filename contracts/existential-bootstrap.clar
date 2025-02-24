;; Existential Bootstrap Contract

(define-map existence-forms uint
  { description: (string-utf8 256), axioms: (list 5 uint) })

(define-data-var next-form-id uint u0)

(define-public (create-existence-form (description (string-utf8 256)) (axioms (list 5 uint)))
  (let ((new-id (+ (var-get next-form-id) u1)))
    (var-set next-form-id new-id)
    (map-set existence-forms new-id { description: description, axioms: axioms })
    (ok new-id)))

(define-read-only (get-existence-form (id uint))
  (ok (map-get? existence-forms id)))

(define-read-only (get-form-count)
  (ok (var-get next-form-id)))

