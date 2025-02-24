;; Reality Axiom Redefinition Contract

(define-map axioms uint (string-utf8 256))

(define-data-var next-axiom-id uint u0)

(define-public (propose-axiom (description (string-utf8 256)))
  (let ((new-id (+ (var-get next-axiom-id) u1)))
    (var-set next-axiom-id new-id)
    (map-set axioms new-id description)
    (ok new-id)))

(define-read-only (get-axiom (id uint))
  (ok (map-get? axioms id)))

(define-read-only (get-axiom-count)
  (ok (var-get next-axiom-id)))

